import React, { useState } from 'react';
import './slider.css';

function MoodSlider(props: { status: number, setStatus: Function }) {
  const { status, setStatus } = props
  const [pos, setPos] = useState(0)
  
  return (
    <div className="slider-container">
      <div className="slider-value">
        {Array.from(Array(11).keys()).reverse().map((n: number) => (
          <div key={n} className="choice" onClick={() => setStatus(n + 1)}>
            {n + 1}
            <div
              draggable
              style={{ display: (status === n + 1) ? 'flex' : 'none' }}
              className="sliding-container"
              onDrag={(e) => {
                if (e.clientY - pos > 70 && status > 1)  {
                  setPos(e.clientY)
                  setStatus(status - 1)
                } else if (e.clientY - pos < -60 && status < 11) {
                  setPos(e.clientY)
                  setStatus(status + 1)
                }
              }}
              onDragEnd={(e) => {
                setStatus(status - 1)
              }}
              onDragStart={(e) => {
                setPos(e.clientY)
              }}
              onTouchStart={(e) => {
                document.documentElement.style.touchAction = "none";
                setPos(e.targetTouches[0].pageY)
              }}
              onTouchMove={(e) => {
                if (e.targetTouches[0].pageY - pos > 70 && status > 1)  {
                  setPos(e.targetTouches[0].pageY)
                  setStatus(status - 1)
                } else if (e.targetTouches[0].pageY - pos < -60 && status < 11) {
                  setPos(e.targetTouches[0].pageY)
                  setStatus(status + 1)
                }
              }}
              onTouchEnd={() => document.documentElement.style.touchAction = "auto"}
              >
              <div className="slider">
                <span>{status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
);
}

export default MoodSlider;
