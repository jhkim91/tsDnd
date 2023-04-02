// autobind decorator
export function autobind(
  //미사용 변수 경고 없애기위해서 _, _순번 규칙을 따르거나 tsconfig.js에서 noUnusedParameters=false로 변경하면됨
  _: any, // target
  _2: string, // methodName
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
