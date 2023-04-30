const track = document.getElementById('image-track');
const checkImage = (e) => {
  if (e.target.id === 'image-section') return true;
  if (e.target.classList.contains('image')) {
    if (e.target.parentNode.id === 'image-track') {
      return true;
    }
  }
  return false;
};

const handleOnDown = (e) => {
  if (checkImage(e)) {
    track.dataset.mouseDownAt = e.clientX;
  }
};

const handleOnUp = (e) => {
  if (checkImage(e)) {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
  }
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === '0') return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: 'forwards' }
  );

  for (const image of track.getElementsByClassName('image')) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  }
};

window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);
