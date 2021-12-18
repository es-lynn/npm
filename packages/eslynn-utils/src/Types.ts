export type Uuid = `${string}-${string}-${string}-${string}`

export type Email = `${string}@${string}.${string}`

export type IPv4 = `${number}.${number}.${number}.${number}`
export type IPv6 =
  `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`
export type IPAddress = IPv4 | IPv6
