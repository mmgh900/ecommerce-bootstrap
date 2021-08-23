import * as React from "react";

export default function LastUpdateBadge({lastUpdate}:{lastUpdate: string}) {
    return (
        <div className="badge bg-available">
            اخرین بروزرسانی موجودی و قیمت:
            {" " + lastUpdate.toString()}
        </div>
    )
}