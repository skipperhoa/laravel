import { usePage } from "@inertiajs/react";

export const config = (key, $default = null) => {
    let page = usePage();
    return page.props.config[key] ?? $default;
}
