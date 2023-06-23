import axios from 'services/axios/interceptor'
import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

type Request<PType> = {
    payload?: PType;
    url: string;
    method: "post" | "delete" | "patch" | "put";
};

type MakeRequest = <PType>(args: Request<PType>) => Promise<{
    data: any;
    message?: string;
    status: "success" | "error";
    error: unknown;
}>;

function useAxios<RType>() {
    const [loading, setLoading] = useState<boolean>(false);
    const makeRequest: MakeRequest = useCallback(async ({ payload, method, url }) => {
        try {
            setLoading(true);
            const response: AxiosResponse<RType> = await axios({
                url,
                method,
                ...(payload && { data: payload }),
            });

            return {
                data: response.data,
                status: "success",
                error: null,
            };
        } catch (error: unknown) {
            let message;
            if (error instanceof AxiosError) {
                const serverErrorMsg = error.response?.data?.message;
                if (serverErrorMsg) message = serverErrorMsg;
                else message = error.message;
            } else message = String(error);
            return { data: null, status: "error", error: message };
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, makeRequest };
}

export default useAxios;
