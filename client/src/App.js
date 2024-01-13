import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import Protected from './Protected';
import Unprotected from './Unprotected';
import video from './video/3840.mp4'
import About from './pages/About';
import Footer from './pages/Footer';


function App() {

  return (
    <>
    <video autoPlay loop muted>
      <source src={video} type='video/mp4'/>
    </video>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={
          <Unprotected Component={ LoginPage}/>
        } />
        <Route path='/register' element={
          <Unprotected Component={ RegisterPage}/>
        } />
        <Route path='/create' element={
          <Protected Component={CreatePost}/>
        } />
        <Route path='/post/:id' element={
          <PostPage/>
        } />
        <Route path='/edit/:id' element={
          <Protected Component={ EditPost}/>
        } />
        <Route path='/about' element={
          < About/>
        } />
        <Route path='*' element={
          < IndexPage/>
        } />
      </Route>
      {/* <Route index element={<div style={{border:"10px solid red",position:"absolute"}}>FOOTER</div>} /> */}
    </Routes>
          {/* <Route index element={<div style={{border:"10px solid red",position:"absolute"}}>FOOTER</div>} /> */}
      <Footer/>
    </>
  );
}

export default App;
