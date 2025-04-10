import { render } from 'solid-js/web';
import SpinnerComponent from './Spinner';

export default class SpinnerController {
    private dispose!: () => void;

    spinn() {
        this.dispose = render(() => <SpinnerComponent />, document.getElementById('spinner-component')!);
    }

    stop(): void {
        if (this.dispose) {
            this.dispose();
        }
    }
}
