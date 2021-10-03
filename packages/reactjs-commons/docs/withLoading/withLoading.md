# withLoading

A powerful function to abstract away your loading states

![](https://i.imgur.com/QYJdyHy.gif)

- [Sandbox with Sample Code](https://codesandbox.io/s/weathered-breeze-x0kt1)
  - [Ant Design](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/AntButton.tsx)
  - [Bootstrap](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/BootstrapButton.tsx)
  - [Material UI](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/MaterialButton.tsx)
  - [Vanilla React](https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/ReactButton.tsx)

## Usage

1) Convert your Button to an AsyncButton:
    
    [Click here for examples in other mainstream libraries](./samples.md)  

    ```tsx
    // If you are using a Component Library
    import { withLoading } from "reactjs-commons";
    
    export const AsyncButton = withLoading(Button);
    ```
    
    ```tsx
    // If you are using pure React
    import { withLoading } from "reactjs-commons";
    
    export const AsyncButton = withLoading((props) => {
      return <button {...props} />;
    });
    ```

2) Replace all instances of your old `Button` with the newly created `AsyncButton`

3) Either 
    - Pass in an `async function` to your `onClick` handler, then remember to call `await` on all async functions. 
    ```tsx
    async function onClick() {
      await delay(1000);
      alert("The task has completed");
    }
    
    return <AsyncButton onClick={() => onClick()}>
      withLoading Button
    </AsyncButton>
    ```
    - Alternatively, use a synchronous function and return the Promise
    ```tsx
    function onClick() {
      return delay(1000).then(() => {
        alert("The task has completed");
      });
    }
    
    return <AsyncButton onClick={() => onClick()}>
      withLoading Button
    </AsyncButton>
    ```

## What does withLoading do?

`withLoading` wraps any component that has a handler (the most common one being `onClick()`), and automatically injects two props:

- loading: boolean
- disabled: boolean

`withLoading` will automatically detect if an async function is being passed to the handler, then set both `loading` and `disabled` to `true` when the handler is invoked.

After the handler has resolved the promise, it will set `loading` and `disabled` back to `false`

## Why do I need this for?

Have you ever had to display a loading state on your button while it completes an asynchronous request? Chances are you've written code similar to this before:

```tsx
    const [loading, setLoading] = useState(false);
    
    async function onClick() {
      setLoading(true);
      await delay(1000);
      setLoading(false);
    }
    
    return (
      <Button 
        onClick={onClick} 
        loading={loading} 
        disabled={loading}
      >
        Button
      </Button>
    )
```

It works fine if you only have 1 or 2 buttons. But it gets tedious to write after a few times. `withLoading` abstracts this code from you so you never need to manage `loading` states again.
__________

For comparison, look how much shorter the new code is after using the `withLoading` HOC. While it may not look like much initially, the difference will accumulate after you've adding dozens of buttons.

```tsx
    const AsyncButton = withLoading(Button)
    
    async function onClick() {
      await delay(1000);
    }
    
    return (
      <AsyncButton onClick={onClick}>
        Button
      </Button>
    )
```


## Customizing Loading Appearance

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/CustomizedButtons.tsx

If you wish to display something else while the Button is loading, it can be easily customized like so:

![](https://i.imgur.com/IO0ArQV.gif)

a) Change Text to 'Loading...'

```tsx
export const LoadingTextButton = withLoading((props) => {
  if (props.loading) {
    return <button {...props}>Loading...</button>;
  } else {
    return <button {...props} />;
  }
});
```

b) Use a Loading Spinner

```tsx
export const SpinnerButton = withLoading((props) => {
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

## Usage with non-Buttons, non-onClick, or ReactNative

withLoading can also be used with components that don't have the `onClick` interface.

### Binding loading state to a separate function

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/CustomHandlers.tsx

By default, the `loading` and `disabled` state is set based on the `onClick` handler. However you can choose to bind it to a different handler instead, such as `onMouseEnter` or `onMouseLeave`

![](https://i.imgur.com/zV8ScIT.gif)

```tsx
export const OnClickButton = withLoading(Button);
export const OnClickButton = withLoading(Button);
export const OnMouseEnterButton = withLoading(Button, {
  asyncHandler: "onMouseEnter"
});
export const OnMouseLeaveButton = withLoading(Button, {
  asyncHandler: "onMouseLeave"
});
```

```tsx
<OnClickButton onClick={() => onClick()}>
  onClick
</OnClickButton>

<OnMouseEnterButton onMouseEnter={() => onClick()}>
  onMouseEnter
</OnMouseEnterButton>

<OnMouseLeaveButton onMouseLeave={() => onClick()}>
  onMouseLeave
</OnMouseLeaveButton>
```

### React Native

As React Native uses `onPress` instead of `onClick`, pass in an `'onPress'` as the second argument so that withLoading knows to listen to onPress instead.

```tsx
export const OnClickButton = withLoading(Button, {
  asyncHandler: "onPress"
});
```

### Non Button Components

https://codesandbox.io/s/weathered-breeze-x0kt1?file=/src/samples/NonButtons.tsx

`withLoading` can overwrite any handler. It can also be used with custom Components even if they are not Buttons. Here's a sample of how well it integrates with `AntDesign` components.

![](https://i.imgur.com/7eqYUp8.gif)


```tsx
import { Button, Switch, Select } from "antd";

export const AsyncButton = withLoading(Button);
export const AsyncSwitch = withLoading(Switch, {
  asyncHandler: "onChange"
});
export const AsyncSelect = withLoading(Select, {
  asyncHandler: "onSelect"
});

<AsyncButton onClick={() => onClick()}>
  withLoading Button
</AsyncButton>

<AsyncSelect onSelect={() => onClick()}>
  <Option value="1">Value 1</Option>
</AsyncSelect>

<AsyncSwitch onChange={() => onClick()} />
```
