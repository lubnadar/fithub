//import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout
import Navbar from "./components/layout/DashboardNavbar";
import CoachNavbar from "./components/layout/CoachNavbar";
import TraineeNavbar from "./components/layout/TraineeNavbar";
import Footer from "./components/layout/Footer";


// Pages
import Landing from "./pages/Landing";

// Auth
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import EmailVerification from "./pages/auth/EmailVerification";
import DashboardSelector from './pages/auth/DashboardSelector';

// Trainee Pages
import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import DefaultTraineeDashboard from "./pages/trainee/DefaultTraineeDashboard";
import TraineeInfoSetup from "./pages/trainee/Trainee_Info_Setup";
import Profile from "./pages/trainee/Profile";
import ExploreCoaches from "./pages/trainee/ExploreCoaches";
import ExploreEachCoach from "./pages/trainee/Explore_eachCoach";
import PrivateTrainingRequest from "./pages/trainee/PrivateTrainingRequest";
import MyRequests from './pages/trainee/MyRequests';
import PrivatePlanView from "./pages/trainee/PrivatePlanView";
import ExerciseDetail from "./pages/trainee/ExerciseDetail";
import AIWorkoutTracker from "./pages/trainee/AIWorkoutTracker";
import WorkoutDone from "./pages/trainee/WorkoutDone";
import TraineeEntryPoint from "./pages/trainee/TraineeEntryPoint";
import YourDailyPlan from "./pages/trainee/YourDailyPlan";
import TraineeCommunity from "./pages/trainee/TraineeCommunity"; // ✅ إضافة
import DocumaintationExerciseDetail from './pages/trainee/Documaintation-ExerciseDetail';



// Coach Pages
import CoachInfoSetup from "./pages/coach/coach-info-setup";
import CoachDashboard from "./pages/coach/Dashboard";
import CoachProfile from "./pages/coach/CoachProfile";
import CreatePost from "./pages/coach/CreatePost";
import ManageRequests from "./pages/coach/ManageRequests";
import RequestNewExercise from "./pages/coach/RequestNewExercise";
import CoachCommunity from "./pages/coach/CoachCommunity";

// Coach Plans
import PlansOverview from "./pages/coach/plans/PlansOverview";
import CreatePlan from "./pages/coach/plans/CreatePlan";
import PlanDayView from "./pages/coach/plans/PlanDayView";
import RequestHistoryCoach from "./pages/coach/plans/Request_History";

// Store
import StoreHome from "./pages/store/StoreHome";
import ProductDetail from "./pages/store/ProductDetail";
import AddEditProduct from "./pages/store/AddEditProduct";
import SellerDashboard from './pages/store/SellerDashboard';
import SellerInfoSetup from './pages/store/SellerInfoSetup';
import MyOrders from "./pages/store/MyOrders";



//payment
import Checkout from './pages/payment/Checkout';

// Shared
import Chat from "./pages/shared/Chat";
import Notifications from './pages/shared/Notifications';

// Workouts
import WorkoutLibrary from './pages/workouts/WorkoutLibrary';
import ExerciseDetailModal from './pages/workouts/ExerciseDetailModal';

const HIDE_NAVBAR_PATHS = [
  '/', '/register', '/login', '/verify-email',
  '/dashboard-selector', '/trainee/setup', '/coach/setup',
  '/workout-library', '/seller/setup', "/trainee/profile", "/store/product/:id",
  "/store/add-product", "/coach/plans/create", "/checkout", "/trainee/daily-plan", "/trainee/workout-done", "/store/my-orders"
  , "/trainee/ai-tracker"
];

const HIDE_FOOTER_PATHS = [
  '/', '/register', '/login', '/verify-email',
  '/dashboard-selector', '/trainee/setup', '/coach/setup', '/seller/setup', '/notifications',
  "/chat", "/trainee/profile", "/coach/request-new-exercise", "/store/dashboard", "/store/add-product", "/coach/plans/create",
  "/store/product/:id", "/checkout", "/trainee/daily-plan", "/trainee/workout-done", "/store/my-orders", "/trainee/exercise/:id",
  "/trainee/ai-tracker"
];

export default function App() {
  const location = useLocation();
  //*const [user, setUser] = useState(null);

  /*  useEffect(() => {
     const storedUser = JSON.parse(localStorage.getItem("user"));
     if (storedUser) setUser(storedUser);
   }, []);*/

  const shouldHideNavbar = HIDE_NAVBAR_PATHS.includes(location.pathname);
  const shouldHideFooter = HIDE_FOOTER_PATHS.includes(location.pathname);
  const isCoachRoute = location.pathname.startsWith('/coach');
  const isTraineeRoute = location.pathname.startsWith('/trainee');

  return (
    <>
      {/* ✅ Navbar حسب نوع الصفحة */}
      {!shouldHideNavbar && (
        isCoachRoute ? <CoachNavbar /> :
          isTraineeRoute ? <TraineeNavbar /> :
            <Navbar />
      )}

      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />

          {/* Auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/dashboard-selector" element={<DashboardSelector />} />


          {/* Trainee */}
          <Route path="/trainee/setup" element={<TraineeInfoSetup />} />
          <Route path="/trainee" element={<TraineeEntryPoint />} />
          <Route path="/trainee/dashboard" element={<TraineeDashboard />} />
          <Route path="/trainee/profile" element={<Profile />} />
          <Route path="/trainee/explore-coaches" element={<ExploreCoaches />} />
          <Route path="/trainee/coach/:id" element={<ExploreEachCoach />} />
          <Route path="/trainee/private-request/:id" element={<PrivateTrainingRequest />} />
          <Route path="/trainee/my-requests" element={<MyRequests />} />
          <Route path="/trainee/plan" element={<PrivatePlanView />} />
          <Route path="/trainee/ai-tracker" element={<AIWorkoutTracker />} />
          <Route path="/trainee/workout-done" element={<WorkoutDone />} />
          <Route path="/trainee/daily-plan" element={<YourDailyPlan />} />
          <Route path="/trainee/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/trainee/default-dashboard" element={<DefaultTraineeDashboard />} />
          <Route path="/trainee/community" element={<TraineeCommunity />} />
          <Route path="/trainee/exercise-detail" element={<DocumaintationExerciseDetail />} />
          <Route path="/trainee/my-orders" element={<MyOrders />} />





          {/* Coach */}
          <Route path="/coach/setup" element={<CoachInfoSetup />} />
          <Route path="/coach/dashboard" element={<CoachDashboard />} />
          <Route path="/coach/:id" element={<CoachProfile />} />
          <Route path="/coach/create-post" element={<CreatePost />} />
          <Route path="/coach/manage-requests" element={<ManageRequests />} />
          <Route path="/coach/request-new-exercise" element={<RequestNewExercise />} />
          <Route path="/coach/plans" element={<PlansOverview />} />
          <Route path="/coach/plans/create" element={<CreatePlan />} />
          <Route path="/coach/plans/day/:id" element={<PlanDayView />} />
          <Route path="/coach/requests-history" element={<RequestHistoryCoach />} />
          <Route path="/coach/community" element={<CoachCommunity />} />

          {/* Store */}
          <Route path="/store" element={<StoreHome />} />
          <Route path="/store/product/:id" element={<ProductDetail />} />
          <Route path="/store/add-product" element={<AddEditProduct />} />
          <Route path="/store/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/setup" element={<SellerInfoSetup />} />
          <Route path="/store/my-orders" element={<MyOrders />} />


          {/* Workouts */}
          <Route path="/workout-library" element={<WorkoutLibrary />} />
          <Route path="/exercise-detail" element={<ExerciseDetailModal />} />

          {/*payment*/}
          <Route path="/checkout" element={<Checkout />} />

          {/* Shared */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </main>

      {/* ✅ Footer */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}