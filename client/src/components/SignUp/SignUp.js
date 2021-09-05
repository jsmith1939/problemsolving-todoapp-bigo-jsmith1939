import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useRouter from "../../hooks/useRouter";
import { useProvideAuth } from "../../hooks/useAuth";
import { setAuthToken } from "../../utils/axiosConfig";

const initialState = {
  username: "",
  password: "",
  error: null,
};

const SignUp = () => {
  const [data, setData] = useState(initialState);
  const auth = useProvideAuth();
  const router = useRouter();

  // What is the Big O Notation of the following lines (20-25)
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignup = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      return;
    }

    try {
      const res = await auth.signup(data.username, data.password);
      setAuthToken(res.token).then(router.push("/"));
    } catch (error) {
      setData({
        ...data,
        error: error ? error.message || error.statusText : null,
      });
    }
  };

  return (
    <div className="SignUp">
      <Form noValidate validated onSubmit={handleSignup}>
        <h3 className="mb-3">Join Us!</h3>
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <br />
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
            value={data.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="Register">Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Password"
            id="inputPasswordRegister"
            value={data.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        {data.error && (
          <span className="form-error text-warning">{data.error}</span>
        )}
        <Button type="submit">Sign up</Button>
      </Form>
    </div>
  );
};

export default SignUp;
