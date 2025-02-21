import React from "react";
import "./ParamEditor.css";

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: any[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  handleChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      ),
    }));
  };

  getModel(): Model {
    return {
      paramValues: this.state.paramValues,
      colors: [],
    };
  }

  render() {
    return (
      <div className="container">
        {this.props.params.map((param) => {
          const paramValue = this.state.paramValues.find((p) => p.paramId === param.id)?.value || "";
          return (
            <div key={param.id} className="item">
              <label>{param.name}</label>
              <input
                type="text"
                value={paramValue}
                onChange={(e) => this.handleChange(param.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ParamEditor;
