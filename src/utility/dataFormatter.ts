// @ts-nocheck

export const handleFormatData = (data: any[]) =>{
	const groupedData = data.reduce((acc, obj) => {
        const key = `${obj.location.parent.name}-${obj.year}`;
        if (!acc[key]) {
          acc[key] = {
            location: obj.location,
            year: obj.year,
            quarters: {
              Q1: { id: null, exists: false },
              Q2: { id: null, exists: false },
              Q3: { id: null, exists: false },
              Q4: { id: null, exists: false }
            }
          };
        }
        acc[key].quarters[`Q${obj.quarter}`] = { id: obj.id, exists: true };
        return acc;
      }, {});
      
      // Convert the grouped data into an array of objects
      return Object.values(groupedData).map(obj => {
        return {
          location: obj.location,
          year: obj.year,
          quarters: obj.quarters
        };
      });
      
}
export const handleFormatData2 = (data: any[]) =>{
	const groupedData = data.reduce((acc, obj) => {
        const key = `${obj.location.name}-${obj.year}`;
        if (!acc[key]) {
          acc[key] = {
            location: obj.location,
            year: obj.year,
            quarters: {
              Q1: { id: null, exists: false },
              Q2: { id: null, exists: false },
              Q3: { id: null, exists: false },
              Q4: { id: null, exists: false }
            }
          };
        }
        acc[key].quarters[`Q${obj.quarter}`] = { id: obj.id, exists: true };
        return acc;
      }, {});
      
      // Convert the grouped data into an array of objects
      return Object.values(groupedData).map(obj => {
        return {
          location: obj.location,
          year: obj.year,
          quarters: obj.quarters
        };
      });
      
}
export const handleFormatData3 = (data: any[]) =>{
	const groupedData = data.reduce((acc, obj) => {
        const key = `${obj.facility.name}-${obj.year}`;
        if (!acc[key]) {
          acc[key] = {
            facility: obj.facility,
            year: obj.year,
            quarters: {
              Q1: { id: null, exists: false },
              Q2: { id: null, exists: false },
              Q3: { id: null, exists: false },
              Q4: { id: null, exists: false }
            }
          };
        }
        acc[key].quarters[`Q${obj.quarter}`] = { id: obj.id, exists: true };
        return acc;
      }, {});
      
      // Convert the grouped data into an array of objects
      return Object.values(groupedData).map(obj => {
        return {
            facility: obj.facility,
          year: obj.year,
          quarters: obj.quarters
        };
      });
      
}

export function filterNonNullValues(array:any) {
  return array.filter(item => item !== null);
}