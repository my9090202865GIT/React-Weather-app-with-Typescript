import React from 'react'
import { useFeatureFlag } from "../../hooks/useFeatureFlags";

const Dummy = () => {
    const { flags, setFlags } = useFeatureFlag();
    return (<>
        {
            flags?.enableSmartDefault ? <div>Smart default enabled</div> : <div>Smart default disabled</div>
        }
        <button onClick={() => setFlags((prevFlag) => ({
            enableSmartDefault: !prevFlag.enableSmartDefault,
            enableBetaFeature: !prevFlag.enableBetaFeature,
        }))}>click to change Smart default</button>
    </>
    )
}

export default Dummy