import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "../css/SearchResultContainer.css";

function SearchResultContainer(props) {
  let calledApi = false;

  const liArrayPositionRef = new Array();
  const { handleListItemClick, saveSearchListRef } = props;

  const [searchResultList, setSearchResultList] = useState([]);

  const [internalState, setInternalState] = useState(props.typingCharacter);

  const [previousValue, setPreviousValue] = useState();

  const timeoutRef = useRef(null);

  const callApi = () => {
    calledApi = true;
    let apiUrl = "";

    console.log("Searchpage dollar search ", props.isDollarSearchEnabled);

    if (props.isDollarSearchEnabled) {
      apiUrl = `https://api-eproc.premierauto.ae/api/cubixitems/$c/${internalState}`;
      console.log("Searchpage dollar search ", apiUrl);
    } else {
      apiUrl = `https://api-eproc.premierauto.ae/api/cubixitems/${internalState}`;
      console.log("Searchpage dollar search ", apiUrl);
    }

    axios
      .get(apiUrl)
      .then((res) => {
        calledApi = false;
        console.log("SearchResultContainer item search response is ", res.data);
        if (res.data.length > 0) {
          setSearchResultList(res.data);
        }
      })
      .catch(() => {
        calledApi = false;
        console.log(" SearchResultContainer error on item search API");
      });
  };
  function validate() {
    console.log(
      "Validating after 500ms... call Api search text is ",
      internalState
    );
    if (calledApi) {
      console.log("Already called API no need to call again");
    } else {
      callApi();
    }
  }

  if (props.typingCharacter !== previousValue) {
    setInternalState(props.typingCharacter);
    setPreviousValue(props.typingCharacter);
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (internalState != "") {
        validate();
      }
    }, 500);
  }, [internalState]);

  useEffect(() => {
    console.log(
      "reference list array is SearchResultContainer.js before sending to parent",
      liArrayPositionRef
    );

    if (liArrayPositionRef.length > 0) {
      // pass reference array of li elements to parent so on keydown add selectedItem className to current li element
      saveSearchListRef(liArrayPositionRef);
    }
  }, [searchResultList]);

  return (
    <div className="SearchResultContainer-main">
      {
        //after setting state , clear any previous li reference from the array
        liArrayPositionRef.length > 0
          ? (liArrayPositionRef = new Array())
          : null
      }

      <ul>
        {searchResultList.map((item, index) => {
          return (
            <li
              key={index}
              onClick={handleListItemClick}
              data-code={item.code}
              data-description={item.description}
              data-supporteditems={item.supported_items}
              ref={(ref) => liArrayPositionRef.push(ref)}
            >
              <div>{item.code}</div>
              <div>{item.description}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResultContainer;
