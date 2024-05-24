import Login from './Components/auth/Login.jsx';
import AuthLayout from './Components/global/AuthLayout.jsx'
import HomeLayoutAdmin from './Components/global/HomeLayoutAdmin.jsx';
import HomeLayoutSuper from './Components/global/HomeLayoutSuper.jsx';
import Dashboard from './Components/dashboard/Dashboard.jsx'
import { Routes, Route } from 'react-router-dom';
import QnGenetator from './Components/qnGenerator/QnGenetator.jsx';
import { SidebarProviderAdmin } from './ContextStore/SideBarContext.jsx';
import DashboardSuper from './Components/superComp/dashboard/Dashboard.jsx';
import ReviewRequest from './Components/superComp/reviewRequest/ReviewRequest.jsx';
import { SidebarProviderSuper } from './ContextStore/SideBarContextSuper.jsx';
import ViewQuestion from './Components/superComp/Global/ViewQuestion.jsx';
import AllQuestions from './Components/AllQuestionsAdmin/AllQuestions.jsx';
import AllQuestionsSuper from './Components/superComp/AllQuestionsSuper/AllQuestions.jsx';

function App() {
  return (
    <div className="App">
      <SidebarProviderAdmin>
        <SidebarProviderSuper>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>
            {/* <Route path='home' element={<HomeLayout/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
            <Route path='question-generator' element={<QnGenetator/>}/>
          </Route> */}

            <Route path='/super-admin/home' element={<HomeLayoutSuper />}>
              <Route path='dashboard' element={<DashboardSuper />} />
              <Route path='review-request' element={<ReviewRequest />} />
              <Route path="review-request/details/:id" element={<ViewQuestion />} />
              <Route path='all-questions' element={<AllQuestionsSuper />} />
            </Route>
            <Route path='/admin/home' element={<HomeLayoutAdmin />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='question-generator' element={<QnGenetator />} />
              <Route path='all-questions' element={<AllQuestions />} />
            </Route>
          </Routes>
        </SidebarProviderSuper>
      </SidebarProviderAdmin>
    </div>
  );
}

export default App