import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TraineeEntryPoint() {
    const navigate = useNavigate();

    useEffect(() => {
        // نفترض أن "hasActiveSubscription" موجود في localStorage كـ "true" أو "false"
        const hasActiveSubscription = localStorage.getItem("hasActiveSubscription");

        if (hasActiveSubscription === "true") {
            navigate("/trainee/TraineeDashboard");
        } else {
            navigate("/trainee/dashboard_trainee");
        }
    }, [navigate]);

    return null; // لا تعرض شيء، فقط تعيد التوجيه
}
