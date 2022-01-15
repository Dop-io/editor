import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Preview from './Preview';

const PreviewBox = () => {
  const [isNormalSize] = useState(true);
  const frames = useSelector(state => state.present.get('frames'));
  const duration = useSelector(state => state.present.get('duration'));
  const frameList = frames.get('list');
  const activeFrameIndex = frames.get('activeIndex');
  const columns = frames.get('columns');
  const rows = frames.get('rows');
  const smPixelSize = 3;
  const bgPixelSize = 6;

  return (
    <div className="preview-box">
      <div className="preview-box__container">
        <Preview
          frames={frameList}
          columns={columns}
          rows={rows}
          cellSize={isNormalSize ? bgPixelSize : smPixelSize}
          duration={duration}
          activeFrameIndex={activeFrameIndex}
          animate={false}
          animationName="wip-animation"
        />
      </div>
    </div>
  );
};

export default PreviewBox;
