export namespace ClassUtils {
	export function GetSuper(Class: object): object | undefined {
		return (getmetatable(Class) as { __index?: object } | undefined)?.__index;
	}

	type AnyClass = new (...Args: never[]) => object;
	export function GetClassFromInstance<T = unknown>(Instance: unknown): T {
		return (getmetatable(Instance as object) as { __index: object }).__index as T;
	}

	export function GetClassName(Class: object): string {
		return tostring(Class);
	}

	export function DoClassExtendFrom<T extends object>(Class: object, Super: T): Class is T {
		let CurrentClass: object | undefined = Class;
		while (CurrentClass) {
			if (CurrentClass === Super) return true;
			CurrentClass = GetSuper(CurrentClass);
		}
		return false;
	}

	export function DoClassInstanceExtendFrom<T extends AnyClass>(Class: object, Super: T): Class is InstanceType<T> {
		let CurrentClass: object | undefined = Class;
		while (CurrentClass) {
			if (ClassUtils.GetClassFromInstance(CurrentClass) === Super) return true;
			CurrentClass = GetSuper(CurrentClass);
		}
		return false;
	}

	type MethodKeys<T> = {
		[K in keyof T]: T[K] extends Callback ? K : never;
	}[keyof T]; // Retrieve all keys of T that are methods (functions)
	type AddThisToFunction<F, TInstance> = F extends (...Args: infer P) => infer R ? (self: TInstance, ...Args: P) => R : never; // Transform a function type F into one that has an additional first parameter of type TInstance (the "this" context)

	export function GetClassMethod<T extends AnyClass, K extends MethodKeys<InstanceType<T>>>(
		Class: T,
		MethodName: K,
	): AddThisToFunction<InstanceType<T>[K], InstanceType<T>> {
		const Method = rawget(Class, MethodName) as InstanceType<T>[K] | undefined;
		assert(Method, `Method ${MethodName as string} not found in class ${GetClassName(Class)}`);
		return Method as AddThisToFunction<InstanceType<T>[K], InstanceType<T>>;
	}
}
