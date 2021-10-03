# AntDesign

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/AntButton.tsx

![](https://i.imgur.com/QYJdyHy.gif)

```tsx
import { Button } from "antd";

export const AsyncButton = withAsync(Button);
```


# Bootstrap

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/BootstrapButton.tsx

![](https://i.imgur.com/AihkuU0.gif)

```tsx
import { Button } from "react-bootstrap";

export const AsyncButton = withAsync(Button);
```

# Material UI

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/MaterialButton.tsx

![](https://i.imgur.com/oeNNREt.gif)

```tsx
import Button from "@material-ui/core/Button";

export const AsyncButton = withAsync(Button);
```

# Regular React

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/ReactButton.tsx

![](https://i.imgur.com/4iZSTRm.gif)

```tsx
export const AsyncButton = withAsync((props) => {
  return <button {...props} />;
});
```


# Custom Loading Components

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/CustomizedButtons.tsx

![](https://i.imgur.com/IO0ArQV.gif)

## Loading Text with Regular React Button
```tsx
export const LoadingTextButton = withAsync((props) => {
  if (props.loading) {
    return <button {...props}>Loading...</button>;
  } else {
    return <button {...props} />;
  }
});
```

## Loading Spinner with Regular React Button
```tsx
export const SpinnerButton = withAsync((props) => {
  if (props.loading) {
    return (
      <button {...props}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SvgSpinner />
          {props.children}
        </div>
      </button>
    );
  } else {
    return <button {...props} />;
  }
});
```

