import _ from "lodash";

// Returns an array of unique industry objects given a WorkExperience array
const getIndustries = (weObj: any) => {
  const industries = weObj.map((exp: any) => exp.industries);
  const merged = [].concat.apply([], industries);
  return _.uniqBy(merged, (item: any) => item.name);
};

export default getIndustries;
