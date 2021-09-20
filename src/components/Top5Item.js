import React from "react";

export default class Top5Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            editActive: false,
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("item", event.target.id);
        this.setState(prevState => ({
            text: prevState.text,
            editActive: prevState.editActive,
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            text: prevState.text,
            editActive: prevState.editActive,
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            text: prevState.text,
            editActive: prevState.editActive,
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            text: prevState.text,
            editActive: prevState.editActive,
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            text: prevState.text,
            editActive: prevState.editActive,
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }
    handleToggleEdit = () => {
        this.setState(prevState => ({
            editActive: !prevState.editActive
        }));
    }
    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    handleBlur = () => {
        let num = this.getItemNum();
        let index = num-1;
        let textValue = this.state.text;
        console.log("Top5Item handleBlur: " + textValue);
        this.props.updateCallback(index, textValue);
        this.handleToggleEdit();
    }

    getItemNum = () => {
        return this.props.id.substring("top5-item-".length);
    }

    render() {
        const { text } = this.props;
        let num = this.getItemNum();

        if (this.state.editActive) {
            return (
                <input
                    id={"item-" + num}
                    className='top5-item'
                    type='text'
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleUpdate}
                    defaultValue={text}
                />)
        }
        else {
            let itemClass = "top5-item";
            if (this.state.draggedTo) {
                itemClass = "top5-item-dragged-to";
            }
            return (
                <div
                    id={'item-' + num}
                    className={itemClass}
                    onDragStart={this.handleDragStart}
                    onDragOver={this.handleDragOver}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                    draggable="true"
                    onClick={this.handleToggleEdit}
                >
                    {text}
                </div>)
        }
    }
}