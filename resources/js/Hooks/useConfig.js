import { usePage } from "@inertiajs/react";
import get from "lodash/get"; // Import hàm get từ lodash

export const useConfig = () => {
    const { props } = usePage();

    const getConfig = (key, $default = null) => {
        // Lodash sẽ tự hiểu 'translations.cv.name' là đi sâu vào từng tầng
        return get(props, key, $default);
    };

    return { get: getConfig };
};
