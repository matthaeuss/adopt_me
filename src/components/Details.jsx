import { useParams } from "react-router-dom";
import React from "react";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false,
  };

  async componentDidMount() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );

    const data = await response.json();

    // this.setState({ loading: false, ...data.pets[0] });
    this.setState(Object.assign({ loading: false }, data.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    if (this.state.loading) {
      return <h2>loading</h2>;
    }
    const { name, animal, breed, city, description, state, images, showModal } =
      this.state;
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city}, {state}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
                // onClick={this.toggleModal.bind(this)} bez arrow function
              >
                Adopt {name}!
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h2>Would you like to adopt {name}?</h2>
                <div className="buttons">
                  <a href="https://bit.ly/pet-adopt">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
        <Carousel images={images} />
      </div>
    );
  }
}

function WrappedDetails() {
  const params = useParams();

  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
}

export default WrappedDetails;
