
import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from "../slicers/vid-slicer";

export default configureStore({
    reducer:{ store: videoSlicer}
})