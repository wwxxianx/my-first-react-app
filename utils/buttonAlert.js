import toast from "react-hot-toast";

export const buttonAlert = () => {
    toast(() => (
        <div className="flex items-center gap-1">
            <p className="text-sm text-blue">😆 Function Comming Soon!</p>
        </div>
    ));
}