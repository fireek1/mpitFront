export const User = () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <svg width="50" height="50" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.25" y="0.25" width="55.5" height="55.5" rx="27.75" fill="#D1FFF4"/>
            <rect x="0.25" y="0.25" width="55.5" height="55.5" rx="27.75" fill="url(#pattern0_1195_611)"/>
            <rect x="0.25" y="0.25" width="55.5" height="55.5" rx="27.75" stroke="white" strokeWidth="0.5"/>
            <defs>
                <pattern id="pattern0_1195_611" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0_1195_611" transform="translate(0 -0.00251256) scale(0.00502513)"/>
                </pattern>
                <image id="image0_1195_611" width="199" height="200" preserveAspectRatio="none" href="data:image/png;base64,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"/>
            </defs>
        </svg>
    </div>
);

export default User;