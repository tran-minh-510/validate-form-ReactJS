import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: "",
                password: "",
            },
            error: {
                email: false,
                password: false,
            },
            regex: {
                email:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                password:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
            },
            regexSatisfi: {
                email: true,
                password: true,
            },
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newObjError = { ...this.state.error };
        const newObjRegexSatisfi = { ...this.state.regexSatisfi };
        const checkSucsess =
            this.state.form.password !== "" &&
            this.state.form.email !== "" &&
            this.state.error.password === false &&
            this.state.error.email === false &&
            this.state.regexSatisfi.password &&
            this.state.regexSatisfi.email;
        newObjError.email = this.state.form.email === "" ? true : false;
        newObjError.password = this.state.form.password === "" ? true : false;
        newObjRegexSatisfi.email = this.state.regex.email.test(
            this.state.form.email
        );
        this.setState({
            error: newObjError,
            regexSatisfi: newObjRegexSatisfi,
        });
        if (checkSucsess) {
            toast.success("Success !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            if (this.state.regexSatisfi.email && this.state.regexSatisfi.password === false) {
                toast.warn("Mật khẩu chưa đủ mạnh (phải trên 6 kí tự và ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 kí tự đặc biệt) !", {
                    position: toast.POSITION.TOP_RIGHT
                });
                return
            }
            toast.error("Error !", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    handleBlurInput = (e) => {
        const newObjError = { ...this.state.error };
        const newObjRegexSatisfi = { ...this.state.regexSatisfi };
        newObjError[e.target.name] =
            this.state.form[e.target.name] === "" ? true : false;
        if (e.target.name === "email") {
            newObjRegexSatisfi[e.target.name] = this.state.regex.email.test(
                this.state.form.email
            );
        }
        if (e.target.name === "password") {
            newObjRegexSatisfi[e.target.name] = this.state.regex.password.test(
                this.state.form.password
            );
            console.log(this.state.regex.password.test(this.state.form.password));
        }
        this.setState({
            error: newObjError,
            regexSatisfi: newObjRegexSatisfi,
        });
    };

    handleValueInput = (e) => {
        const newObjForm = { ...this.state.form };
        newObjForm[e.target.name] = e.target.value;
        this.setState({
            form: newObjForm,
        });
    };

    render() {
        return (
            <>
                <form className="needs-validation">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${this.state.error.email
                                ? "is-invalid"
                                : this.state.regexSatisfi.email
                                    ? ""
                                    : "is-invalid"
                                }`}
                            id="exampleInputEmail1"
                            placeholder="Email..."
                            onChange={this.handleValueInput}
                            onBlur={this.handleBlurInput}
                        />
                        {this.state.error.email ? (
                            <div className="invalid-feedback">Vui lòng nhập trường này.</div>
                        ) : this.state.regexSatisfi.email ? (
                            ""
                        ) : (
                            <div className="invalid-feedback">Trường này phải là Email.</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${this.state.error.password
                                ? "is-invalid"
                                : this.state.regexSatisfi.password
                                    ? ""
                                    : "is-invalid"
                                }`}
                            id="exampleInputPassword1"
                            placeholder="Password..."
                            onChange={this.handleValueInput}
                            onBlur={this.handleBlurInput}
                        />
                        {this.state.error.password ? (
                            <div class="invalid-feedback">Vui lòng nhập trường này.</div>
                        ) : this.state.regexSatisfi.password ? (
                            ""
                        ) : (
                            <div className="invalid-feedback">Mật khẩu không hợp lệ.</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>
                </form>
                <ToastContainer style={{ fontSize: '1.5rem ' }} />
            </>
        );
    }
}
