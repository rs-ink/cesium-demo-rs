import {forwardRef, useEffect} from "react";
import {ScreenSpaceEvent, ScreenSpaceEventHandler} from "resium";
import {Camera, Cartesian2, defined, Ellipsoid, Globe, Math as CesiumMath, ScreenSpaceEventType,} from 'cesium';

/**
 *获取实例的二维笛卡尔点的经度、纬度、相机高度、海拔高度
 *
 * @param {*} camera
 * @param {*} globe
 * @param {*} Cartesian2
 * @param {*} [ellipsoid=Ellipsoid.WGS84]
 * @returns
 */
const getMousePointPosition = (
    {
        camera = Camera,
        globe = Globe,
        Cartesian2 = Cartesian2,
        ellipsoid = Ellipsoid.WGS84
    }
) => {
    // 通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
    const cartesian = camera.pickEllipsoid(Cartesian2)
    if (!defined(cartesian)) return;

    // 将笛卡尔坐标转换为地理坐标
    const cartographic = ellipsoid.cartesianToCartographic(cartesian);
    // 将弧度转为度的十进制度表示
    const longitude = CesiumMath.toDegrees(cartographic.longitude).toFixed(6);
    const latitude = CesiumMath.toDegrees(cartographic.latitude).toFixed(6);
    // 获取海拔高度
    const elevation = Math.ceil(globe.getHeight(cartographic))

    // 获取相机高度
    const height = Math.ceil(camera.positionCartographic.height) - elevation;

    return {
        long: longitude,
        lat: latitude,
        height: height,
        elevation: elevation,
    };
};
const EventHandler = forwardRef((props, ref) => {
    useEffect(()=>{
        console.log("EventHandler::",props)
    },[])
    const _handleMouseMoveEvent = (e = {position: Cartesian2, endPosition: Cartesian2}) => {
        const {camera, globe} = props.cesium;
        const {setPositionData} = props.appViewer;
        if (!e.endPosition || !camera || !globe) return;
        const positionData = getMousePointPosition({camera, globe, Cartesian2: e.endPosition});
        if (!positionData) return;
        setPositionData(positionData);
    };
    return <ScreenSpaceEventHandler ref={ref}>
        <ScreenSpaceEvent action={_handleMouseMoveEvent} type={ScreenSpaceEventType.MOUSE_MOVE}/>
    </ScreenSpaceEventHandler>
})

export {EventHandler};
