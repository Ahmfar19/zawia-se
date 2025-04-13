import { Component, JSX } from "solid-js";

interface FormProps {
    onSubmit: (event: Event) => void;
    children: JSX.Element;
    class?: string;
}

const Form: Component<FormProps> = (props) => (
    <form
        onSubmit={(event) => {
            event.preventDefault(); // Prevent default form submission
            props.onSubmit(event);
        }}
        class={` ${props.class}`} // Default spacing between form fields
    >
        {props.children}
    </form>
);

export default Form;
