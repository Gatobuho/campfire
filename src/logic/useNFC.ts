export function useNFC(): Ref<boolean> {
  const nfcAble = ref(false)
  let retries = 0
  do {
    if ('NDEFReader' in window)
      nfcAble.value = true

    setTimeout(() => {
      retries = nfcAble.value ? 7 : retries + 1
    }, 1500)
  } while (retries <= 6)

  return nfcAble
}
