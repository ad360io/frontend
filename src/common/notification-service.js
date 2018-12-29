import { notification } from "antd";
import React from "react";
import "antd/lib/notification/style/css";

export const NotificationService = {
    openNotification : (type, {message, description}) => {
        notification[type]({
            message: message,
            description: description,
        });
    }
};
