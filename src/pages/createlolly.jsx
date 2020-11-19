import React, { useState } from 'react'
import { navigate } from "gatsby";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Lolly from '../components/lolly'

const CreateLollyMutation = gql`
mutation createLolly(
    $to: String!,
    $message: String!,
    $from: String!,
    $flavourTop: String!,
    $flavourMiddle: String!,
    $flavourBottom: String!,
    ) { createLolly (
        to: $to,
        message: $message,
        from: $from,
        flavourTop: $flavourTop,
        flavourMiddle: $flavourMiddle,
        flavourBottom: $flavourBottom,
        ) {slug}
    }`

const ErrorMsg = (props) => {
    return (
        <div>
            <p className="errorMsg">{props.children}</p>
        </div>
    );
};
const initialValues = {
    to: "",
    message: "",
    from: "",
};

const validationSchema = Yup.object({
    to: Yup.string().required("Recipient name is required"),

    message: Yup.string()
        .required("Message is required")
        .max(500, "Message should be less than 500 character"),
    from: Yup.string().required("Sender name is Required"),
});

const CreateLolly = () => {
    const [createLolly, { loading }] = useMutation(CreateLollyMutation);
    const [flavours, setFlavours] = useState({
        flavourTop: "#A4193B",
        flavourMiddle: "#DF4343",
        flavourBottom: "#DB2929",
    });

    const onSubmit = async (values, actions) => {
        const result = await createLolly({
            variables: {
                to: values.to,
                message: values.message,
                from: values.from,
                flavourTop: flavours.flavourTop,
                flavourMiddle: flavours.flavourMiddle,
                flavourBottom: flavours.flavourBottom,
            },
        });

        await actions.resetForm({
            values: {
                to: "",
                message: "",
                from: "",
            },
        });
        await navigate(`/frozen/${result.data.createLolly?.slug}`)
        // await navigate(`/lollies/${result.data?.craeteLolly?.slug}`);
        console.log(result);
    };

    return (
        <header>
            <section>
                <aside>
                    <Lolly
                        flavourTop={flavours.flavourTop}
                        flavourMiddle={flavours.flavourMiddle}
                        flavourBottom={flavours.flavourBottom}
                    />
                

                
                <div>
                    <label htmlFor="topFlavor" className="colorPickerLabel">
                        <input
                            className="colorPicker"
                            value={flavours.flavourTop}
                            type="color"
                            name="topFlavor"
                            id="topFlavor"
                            onChange={(e) => {
                                setFlavours({
                                    ...flavours,
                                    flavourTop: e.target.value,
                                });
                            }}
                        ></input>
                    </label>

                    <label htmlFor="midFlavor" className="colorPickerLabel">
                        <input
                            className="colorPicker"
                            value={flavours.flavourMiddle}
                            type="color"
                            name="midFlavor"
                            id="midFlavor"
                            onChange={(e) => {
                                setFlavours({
                                    ...flavours,
                                    flavourMiddle: e.target.value,
                                });
                            }}
                        ></input>
                    </label>

                    <label htmlFor="botFlavor" className="colorPickerLabel">
                        <input
                            className="colorPicker"
                            value={flavours.flavourBottom}
                            type="color"
                            name="botFlavor"
                            id="botFlavor"
                            onChange={(e) => {
                                setFlavours({
                                    ...flavours,
                                    flavourBottom: e.target.value,
                                });
                            }}
                        ></input>
                    </label>
                </div>
                </aside>

                
            

            <div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <div style={{ paddingBottom: "8px" }}>
                                <Field
                                    name="to"
                                    type="text"
                                    label="Title"
                                    className="textFeild"
                                    placeholder="to"
                                />
                                <ErrorMessage component={ErrorMsg} name="to" />
                            </div>
                            <div style={{ paddingBottom: "8px" }}>
                                <Field
                                    style={{ resize: "none" }}
                                    className="textFeild"
                                    as="textarea"
                                    rows="3"
                                    name="message"
                                    type="text"
                                    label="Title"
                                    placeholder="Message"
                                />
                                <ErrorMessage component={ErrorMsg} name="message" />
                            </div>
                            <div style={{ paddingBottom: "12px" }}>
                                <Field
                                    name="from"
                                    type="text"
                                    label="Title"
                                    className="textFeild"
                                    placeholder="from"
                                />
                                <ErrorMessage component={ErrorMsg} name="from" />
                            </div>
                            <button
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                Freeze
                            </button>
                        </Form>
                    </Formik>
                </div>
                </section>
        </header>
    )
}

export default CreateLolly
