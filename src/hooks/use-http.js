import { useState } from "react";

const useHttp = (requestConfig, applyToData) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const sendRequest = async () => {
        setIsLoading(true);

        try {
            const response = await fetch( requestConfig.url, {
                    method: requestConfig.method? requestConfig.method : "GET",
                    headers: requestConfig.header? requestConfig.headers : {},
                    body: requestConfig.body? JSON.stringify(requestConfig.body) : null
            });
    
            if(!response.ok) {
                throw new Error(`request failed, error status ${response.status}`);
            }
    
            const data = await response.json();

            applyToData(data);
        }
        catch (e) {
            setError(e.message);
        }

        setIsLoading(false);
    }

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    };
};

export default useHttp;