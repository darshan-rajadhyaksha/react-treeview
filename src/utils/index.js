
export const getClassName = (classes) => {
	return Object.entries(classes).reduce((cls, [className, isApply]) => {
		if(isApply){
			return `${cls} ${className}`;
		}
		return cls;
	}, "");
};
