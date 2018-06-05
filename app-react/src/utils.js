import fakePositions from './data/fakePositions';

export function updateFakePosition() {
    const self = this;
    let i = 0;
    setInterval(() => {
      if (i >= fakePositions.length) {
        i = 0;
      } else {
        let [lat, lng] = fakePositions[i].split(',').map(s => Number(s));
        self.setState({ position: { lat, lng } });
        i++;
      }
    }, 1000);
  }