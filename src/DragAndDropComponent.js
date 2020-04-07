import React, { useEffect, useState } from 'react';
import _ from "lodash";
import './App.css';
import { connect, useDispatch, useSelector } from 'react-redux';

const jsonData = require('./data.json');

const DragAndDropComponent = () => {
  const [gShuffled, setGShuffled] = useState(_.shuffle(jsonData.box_set[0].green_box_set)[0]);
  const [blueShuffled, setBlueShuffled] = useState(_.shuffle(jsonData.box_set[1].blue_box_set)[0]);
  const [target, setTarget] = useState(false);

  const showAddedValue1 = useSelector(state => state.addValue ? state.addValue : '  ');
  const showAddedValue2 = useSelector(state => state.updateValue ? state.updateValue : '  ');
  const dispatch = useDispatch();

  const [checkTarget, checkTargetStatus] = useState(false);

  let currentObject = [];
  let storeGreenBoxValue = [];
  let storeBlueBoxValue = [];

  const addValue = () => {
    if (storeGreenBoxValue[0])
      dispatch({ type: "ADD", id: storeGreenBoxValue[0] });
  }

  const updateValue = () => {
    if (storeBlueBoxValue[0])
      dispatch({ type: "UPDATE", id: storeBlueBoxValue[0] });
  }

  const dragOver = (e) => {
    e.preventDefault();
  }

  const dragStart = (e) => {    
    checkTargetStatus(false);
    setTarget(e.target);
    e.target.style.opacity = .3;
  }

  const onDrop = (e) => {
    (e.target).children[0].style.opacity = 0;
    target.style.opacity = 0.3;
    
    let copyItem = target.firstChild;
    let cloneItem = copyItem.cloneNode(true);
    (e.target).append(cloneItem);

    if ((e.currentTarget).className.split(' ')[0] !== target.className.split(' ')[0]) {
      let _childCount = ((e.target).children[0].innerText).substring(10);
      setTimeout(() => {
        currentObject[_childCount - 1][_childCount].style.display = 'none';
        currentObject[_childCount - 1][2].style.display = 'none';
        currentObject[0][0].style.opacity = 1;
        target.append(currentObject[_childCount - 1][2]);

        target.children[0].style.display = 'block';
        currentObject.splice(2, 1);
      }, 1000);

      if (_childCount > 1) {
        _childCount = _childCount - 1;
      }
      
      (e.target).children[_childCount].style.display = 'block';
      currentObject.push((e.target).children);
      checkTargetStatus(false);
    } else {
      target.style.pointerEvents = "none";
      if((e.currentTarget).className.split(' ')[0] === "green-border"){
        storeGreenBoxValue.push((e.target).children[2].innerText);
        addValue();      
      }else{
        storeBlueBoxValue.push((e.target).children[2].innerText);
        updateValue();
      }      
      (e.target).style.pointerEvents = "none";
      
       checkTargetStatus(true);
    }
  }

  const dragEnd = (e) => {    
    if(!checkTarget){
      e.target.style.opacity = 1;
    }
  }

  return (
    <div className="App">
      <div className="draggable-area">
        <div className="area_background">
          <div className="green-border g-box-color parent-container" onDragOver={dragOver} onDrop={onDrop}>
            <h1 className="child-element">
              Drop Area 1
            </h1>
            <h5 className="child-element isShowX">
              X
            </h5>
          </div>
          <hr className="green-hr"></hr>
          <div className="green-border g-box-color parent-container" onDragOver={dragOver} onDrop={onDrop}>
            <h1 className="child-element">
              Drop Area 2
            </h1>
            <h5 className="child-element isShowX">
              X
            </h5>
          </div>
        </div>
        <div className="cross">
          <img src="cross.JPG" alt="multiply" />
        </div>
        <div className="area_background">
          <div className="blue-border g-box-color parent-container" onDragOver={dragOver} onDrop={onDrop}>
            <h1 className="child-element">
              Drop Area 1
            </h1>
            <h5 className="child-element isShowX">
              X
            </h5>
          </div>
          <hr className="blue-hr"></hr>
          <div className="blue-border g-box-color parent-container" onDragOver={dragOver} onDrop={onDrop}>
            <h1 className="child-element">
              Drop Area 2
            </h1>
            <h5 className="child-element isShowX">
              X
            </h5>
          </div>
        </div>
        <div className="cross">
          <img src="equal.JPG" alt="equal" />
        </div>
        <div className="g-box-color result_box">
          <div className="result_txt">
            {showAddedValue1}
          </div>
          <div className="result_txt">
            {showAddedValue2}
          </div>
        </div>

      </div>
      <div className="draggable-content">
        <div className="area_background">
          <div className="green-border green-box-color parent-container" onDragStart={dragStart} onDragEnd={dragEnd} onDrop={onDrop} draggable="true">
            <h1 className="child-element">
              {gShuffled.set[0].box_val[0]}
            </h1>
          </div>
          <div className="green-border green-box-color parent-container" onDragStart={dragStart} onDragEnd={dragEnd} onDrop={onDrop} draggable="true">
            <h1 className="child-element">
              {gShuffled.set[0].box_val[1]}
            </h1>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="area_background">
          <div className="blue-border blue-box-color parent-container" onDragStart={dragStart} onDragEnd={dragEnd} onDrop={onDrop} draggable="true">
            <h1 className="child-element">
              {blueShuffled.set[0].box_val[0]}
            </h1>
          </div>
          <div className="blue-border blue-box-color parent-container" onDragStart={dragStart} onDragEnd={dragEnd} onDrop={onDrop} draggable="true">
            <h1 className="child-element">
              {blueShuffled.set[0].box_val[1]}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  addValue: state.addValue
},
{
  updateValue: state.updateValue
});

export default connect(mapStateToProps)(DragAndDropComponent);
