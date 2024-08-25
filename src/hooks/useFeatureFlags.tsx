import React from "react";

 type featureFlagsType = {
    enableSmartDefault: boolean,
    enableBetaFeature: boolean,
};

export const useFeatureFlag = (): {
    flags: featureFlagsType, setFlags: React.Dispatch<React.SetStateAction<{
        enableSmartDefault: boolean;
        enableBetaFeature: boolean;
    }>>
} => {
    const [flags, setFlags] = React.useState<featureFlagsType>({
        enableSmartDefault: true,
        enableBetaFeature: false,
    })
    return { flags, setFlags };
};
