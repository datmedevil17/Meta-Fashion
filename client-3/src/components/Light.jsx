import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

const Light = () => {
    const lightRef = useRef(null);
    useHelper(lightRef, DirectionalLightHelper, 5, "red");

    return (
        <>
            <ambientLight intensity={2} />
            <directionalLight 
                color={"white"} 
                position={[0, 50, 50]} 
                ref={lightRef} 
                castShadow 
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-bottom={-50}
                shadow-camera-top={50} 
            />
        </>
    );
}

export default Light;
