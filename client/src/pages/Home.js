import { SignUp, SignIn } from "../components";

const Home = () => {

  return (
    <div className='Home'>
      <h1> Welcome to the Todo App </h1>
      <p> Please sign up or sign in </p>
      <div className='flex'>
        <SignUp />
        <div className='spacer'>OR</div>
        <SignIn />
      </div>
    </div>
  )
}

export default Home;