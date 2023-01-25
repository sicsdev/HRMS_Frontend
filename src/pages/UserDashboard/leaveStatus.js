import React, { useEffect, useState } from "react";
import Header from "../../utils/header";
import { Calendar, theme } from 'antd';
import { CalendarMode } from 'antd/es/calendar/generateCalendar'

function LeaveStatus() {

    const { token } = theme.useToken();


    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };



    return (
        <>
            <div>
                <Header />
            </div>
            <div className="calender_width">

                <div style={wrapperStyle} className="mt-4" >

                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />

                </div>
            </div>
        </>
    );
}
export default LeaveStatus;