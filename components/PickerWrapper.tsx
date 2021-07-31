import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerWrapperProps {
  pickerItems: string[];
  selectedPickerItem: string;
  setSelectedPicketItem: Dispatch<SetStateAction<string>>;
  // setSelectedPicketItem: any;
}
// interface PickerWrapperState {
//   selectedPickerItem: undefined;
//   setSelectedPicketItem: any;
// }
const PickerWrapper = ({
  pickerItems,
  selectedPickerItem,
  setSelectedPicketItem,
}: PickerWrapperProps) =>
  // { selectedPickerItem, setSelectedPicketItem }: PickerWrapperState
  {
    return (
      <Picker
        mode="dropdown"
        style={styles.picker}
        selectedValue={selectedPickerItem}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedPicketItem(itemValue)
        }
      >
        {pickerItems.map((bedroomNum, bedroomNumIdx) => {
          return (
            <Picker.Item
              key={bedroomNumIdx}
              label={bedroomNum}
              value={bedroomNum}
            />
          );
        })}
      </Picker>
    );
  };

const styles = StyleSheet.create({
  picker: {
    width: 200,
  },
});

export default PickerWrapper;
