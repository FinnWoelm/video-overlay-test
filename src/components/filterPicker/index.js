require('./filterPicker.css');

let currentFilter;

// const randomColour = () => {
//   return Math.round(Math.random() * 255);
// };

let ctx

function face(videoElement, canvas, filter) {
  let ctx;
  let stopped = false;

  // Draws a frame on the specified canvas after applying the selected filter every
  // requestAnimationFrame
  const drawFrame = function drawFrame() {
    if (!ctx) {
      ctx = canvas.getContext('2d');
    }
    // if (!videoElement.width) {
    //   // This is a fix for clmtrackr, otherwise it complains about 0 width & height
    //   videoElement.width = canvas.width; // eslint-disable-line no-param-reassign
    //   videoElement.height = canvas.height; // eslint-disable-line no-param-reassign
    // }
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    filter(ctx, canvas)

    console.log(ctx)

    if (!stopped) {
      requestAnimationFrame(drawFrame);
    } else {
      ctx = null;
    }
  };

  requestAnimationFrame(drawFrame);

  return {
    stop: () => {
      stopped = true;
    },
  };
}

module.exports = (videoElement, canvas, filters, appendTo) => {



  const customFilter = (videoElement, canvas) => {
    return face(videoElement, canvas, (context, canvas) => {
      // console.log("bonjour!")
      context.font = "30px Arial";
      context.fillStyle = "red";
      context.textAlign = "center";
      // context.fillRect(0, 50, 200, 200)
      context.fillText("#MoreViralThanCorona", canvas.width/2, canvas.height/2);
      // context.fillText("Hello World", 250, 50)
    })
  }

  console.log(filters)
  filters["custom"] = customFilter

  const changeFilter = f => {
    if (currentFilter) {
      currentFilter.stop();
    }
    currentFilter = filters[f](videoElement, canvas);
  };

  // const selector = document.createElement('div');
  // selector.className = 'filterPicker';
  // let f;
  // for (f of ["custom"]) {
  //   const option = document.createElement('div');
  //   option.className = 'filterOption';
  //   const span = document.createElement('span');
  //   span.innerHTML = f;
  //   option.appendChild(span);
  //   option.addEventListener('click', changeFilter.bind(this, f));
  //   selector.appendChild(option);
  // }
  // appendTo.appendChild(selector);
  changeFilter('custom');
};
