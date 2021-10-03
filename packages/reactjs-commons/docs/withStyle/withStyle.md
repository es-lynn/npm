# withStyle

A simple minimalist function to add styles to existing components, in order to create more flexible, reusable functions. Compatible with React & ReactNative with first class Intellisense support.

You can try it out here:

- [React Sandbox](https://codesandbox.io/s/withstyle-qwebt?file=/src/ReactSandbox.tsx)
- [React Native Sandbox](https://codesandbox.io/s/withstyle-react-native-zfe43?file=/src/ReactNativeSandbox.tsx)  

## Basic Usage

1) Installation

    - yarn: `yarn add reactjs-commons`
    - npm: `npm install reactjs-commons`

2) Let's start by creating a new Button component which has rounded edges and name it `RoundedButton`

    ```tsx
   import { withStyle } from "reactjs-commons";
    
    const RoundedButton = withStyle(Button)({
      borderRadius: 10
    })
    ```

3) We can now call the RoundedButton directly

    ```tsx
    <RoundedButton>My Rounded Button</RoundedButton>
    ```
   
4) We can also apply inline styles to it. Styles will automatically be merged with the original `borderRadius: 10` styling.

    ```tsx
    return (
      <div>
        <button>Regular Button</button>
        <RoundedButton>My Rounded Button</RoundedButton>
        <RoundedButton style={{ backgroundColor: '#FFCC00' }}>My Yellow Button</RoundedButton>
        <RoundedButton style={{ borderColor: '#FF3333' }}>My Red Border Button</RoundedButton>
      </div>
    )
    ```

    ![](https://i.imgur.com/miasoaG.png)
    
5) All props available in the base component are automatically available for you.

    ```tsx
    <RoundedButton onClick={()=>console.log('onClick'}>
      My Rounded Button
    </RoundedButton>
    ```
   
   If you are using VSCode or Webstorm, you will notice that auto-complete is available for props.
   
   ![](https://i.imgur.com/ONk4aYt.gif)

## Advanced Usage

### Combining Components

You can style components based on existing components. We will now create a `ShadowRoundedButton` that will add shadows on top of our `RoundedButton`

```tsx
const ShadowRoundedButton = withStyle(RoundedButton)({
  boxShadow: '1px 3px 1px #9E9E9E'
})
```

```tsx
<ShadowRoundedButton>My Shadow Button</ShadowRoundedButton>
```

![](https://i.imgur.com/es7mIeK.png)


### Styling based on props

You can style your component based on the existing props available to your button.

We will make a `DisabledButton` that turns dark grey when when `disabled = true`

```tsx
const DisabledButton = withStyle(RoundedButton)(props => ({
  backgroundColor: props.disabled ? '#999' : '#FF'
}))
```

```tsx
<DisabledButton>Enabled</DisabledButton>
<DisabledButton disabled={true}>Disabled</DisabledButton>
```

![](https://i.imgur.com/RtsLhcV.png)

Props that exist on the base component will be suggested to you

![](https://i.imgur.com/wDgHUZo.gif)

### Adding new props

Finally, you can also add new props.

Let's create a new CircleButton that takes in a prop `size`, which determine's its `height/width/borderRadius`.

```tsx
const CircleButton = withStyle('button')(props => ({
  borderRadius: props.size / 2,
  height: props.size,
  width: props.size
}))
```

```tsx
<CircleButton size={40}>S40</CircleButton>
<CircleButton size={60}>S60</CircleButton>
<CircleButton size={50}>S50</CircleButton>
```

![](https://i.imgur.com/Yo2gnS3.png)

## Typescript

If you are using Typescript, you can annotate the new props like this:

```tsx
const CircleButton = withStyle('button')<{ size: number }>(props => ({
  borderRadius: props.size / 2,
  height: props.size,
  width: props.size
}))
```

You will now receive autocomplete and compilation errors on both the prop and the component

![](https://i.imgur.com/F6pO60A.png)

![](https://i.imgur.com/fI988xD.png)

## Why did you build this?

After working on a large ReactNative app, I ended up with a lot of components that only required a bit of styling, but it was a pain having to forward props and styling, while being careful such that you don't overwrite styles accidentally. 

It was also annoying to have to re-forward all the prop types too to continue to benefit from Intellisense. I ended up with lots of code that looked like this:

```tsx
export const CircleButton: React.FC<
  { size: number } 
  & React.ComponentProps<typeof Button>
> = props => {
  const style: ButtonProps['style'] = {
    borderRadius: props.size,
    height: props.size,
    width: props.size
  }
  if (props.style instanceof Object) {
    Object.assign(style, props.style)
  }
  return <Button {...props} style={style} />
}
```
 
Compare it with this code here and see how we cut the size by 3 times:

```tsx
const CircleButton = withStyle(Button)<{ size: number }>(props => ({
  borderRadius: props.size / 2,
  height: props.size,
  width: props.size
}))
```

It's only 10 lines of difference, but it gets tedious after you've written it for the 20th time.

## Comparison with `styled-components`

`withStyle` is: 
- meant to be a simple lightweight one-line function to help you create re-usable components with no extra setup
- meant to provide a syntax which is more familiar to React developers
- meant to provide accurate Intellisense for both React & ReactNative

In short, it is meant for people who want some of the benefits of `styled-components` paired with accurate Intellisense and a more familiar API, but do not want a full library for it.

If you are already using `styled-components`, this library will not provide you anything new.

However if you are using ReactNative, you may find this library beneficial as it is able to provide you auto-completion with the correct styles
