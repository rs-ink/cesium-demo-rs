import './App.css';
import {Camera, Cartesian3, Color, Ion, Material, Rectangle, Transforms} from "cesium";
import {td_cia_imageryProvider, td_img_imageryProvider} from "./helpers/tdt-service";
import {useLayoutEffect, useRef} from "react";
import {
    CesiumWidget,
    Entity,
    EntityDescription,
    Model,
    PointGraphics,
    PolylineGraphics,
    ScreenSpaceCameraController,
    SkyAtmosphere,
    Viewer
} from "resium";
import {cesiumDefaultConfig as cesiumDefaultConfig} from "./config";
import {ImageryLayers} from "./components/layers/ImageryLayers";

// Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(...cesiumDefaultConfig.defaultView);
Ion.defaultAccessToken = cesiumDefaultConfig.cesiumAccessToken;

const imageryProviders = [td_img_imageryProvider, td_cia_imageryProvider];

function App() {
    const ref = useRef()

    useLayoutEffect(() => {
        if (ref.current) {
            console.log(ref)
            // let viewer = ref.current;
            // viewer.animation.container.style.display = 'none';//隐藏动画控件
            // viewer.timeline.container.style.display = 'none';//隐藏时间线控件
            // viewer.geocoder.container.style.display = 'none';//隐藏地名查找控件
            // viewer.cesiumWidgets.creditContainer.style.display = 'none';//隐藏ceisum标识
        }
    }, [ref.current])
    let position = Cartesian3.fromDegrees(
        118.00428553162065,
        36.80421290757789,
        0
    );
    let position1 = Cartesian3.fromDegrees(
        118.00428553162065,
        36.80421290757789,
        -50
    );
    return (
        <Viewer
            full
            infoBox
            homeButton={false}
            animation={true}
            shouldAnimate={true}
            selectionIndicator={false}
            baseLayerPicker={true} //涂层选择器
            timeline={false}
            scene3DOnly={false}D
            sceneModePicker={true} //2D/3D 选择
            navigationInstructionsInitiallyVisible={false}
            geocoder={false}
            orderIndependentTranslucency={true}
            contextOptions={{
                webgl:{
                    alpha:true
                }
            }}
            ref={ref}
        >
            <Entity name="淄博" position={position} tracked={true}>
                <PointGraphics pixelSize={3} color={Color.CRIMSON} outlineWidth={1} outlineColor={Color.LIGHTCORAL}/>
                <EntityDescription resizeInfoBox={true}>
                    <p>淄博!</p>
                </EntityDescription>
            </Entity>
            <Entity position={position}>
                <PolylineGraphics positions={[position, position1]} color={Color.MINTCREAM}
                                  material={Material.AlphaMapType} width={3}/>
            </Entity>
            <Model
                modelMatrix={Transforms.eastNorthUpToFixedFrame(position)}
                allowPicking={true} url={"/static/models/xd.gltf"} show={true}
                scale={1}/>
            <CesiumWidget style={{display: "none"}}  containerProps={{style: {display: "none"}}}/>
            <SkyAtmosphere show={true}/>
            <ScreenSpaceCameraController enableLook={true} minimumZoomDistance={-20000} enableCollisionDetection={true}/>
            {/*<ImageryLayers imageryProviders={imageryProviders}/>*/}

        </Viewer>
    );
}

export default App;
