import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useProvideAuth } from "../../hooks/useAuth";
import { setAuthToken } from "../../utils/axiosConfig";
import useRouter from "../../hooks/useRouter";

const initialState = {
  username: "",
  password: "",
  error: null,
};

const SignIn = () => {
  const [data, setData] = useState(initialState);
  const auth = useProvideAuth();
  const router = useRouter();

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignin = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    event.stopPropagation();
    try {
      const res = await auth.signin(data.username, data.password);
      await setAuthToken(res.token).then(router.push("/"));
    } catch (error) {
      setData({
        ...data,
        error: error ? error.message || error.statusText : null,
      });
    }
  };

  return (
    <div className="SignIn">
      <Form noValidate validated onSubmit={handleSignin}>
        <h3 className="mb-3">Login</h3>
        <Form.Group>
          <Form.Label>Username</Form.Label>
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
          <Form.Label htmlFor="Login">Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            name="password"
            required
            placeholder="Password"
            id="Login"
            value={data.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        {data.error && (
          <span className="form-error text-warning">{data.error}</span>
        )}
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default SignIn;
