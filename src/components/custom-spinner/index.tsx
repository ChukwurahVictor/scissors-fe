import { ColorRing } from "react-loader-spinner";

export interface CustomSpinnerProps {
    height?: string;
    width?: string;
}

const CustomSpinner = ({ height, width }: CustomSpinnerProps) => {
    return (
        <div className="flex align-center justify-center">
            <ColorRing
                visible={true}
                height={height || "40"}
                width={width || "40"}
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#0f63ff", "#0e59e6", "#0c4fcc", "#0b45b3", "#093b99"]}
            />
        </div>
    );
};

export default CustomSpinner;
