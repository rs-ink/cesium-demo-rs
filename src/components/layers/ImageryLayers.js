import {forwardRef} from "react";
import {ImageryLayer} from "resium";
import {WebMapTileServiceImageryProvider} from "cesium";
import memoize from 'memoize-one';

const imageryProvider = memoize((imageryProvider) => new WebMapTileServiceImageryProvider(imageryProvider));
const ImageryLayers = forwardRef((props, ref) => {
    const {imageryProviders} = props;
    return <div ref={ref}>
        {imageryProviders && imageryProviders.map((item, i) => <ImageryLayer key={i} imageryProvider={imageryProvider(item)}/>)}
    </div>
});
export {ImageryLayers}
