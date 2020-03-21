import React from "react";
import { NormalPeoplePicker, IPersonaProps, IBasePicker, IBasePickerSuggestionsProps, ValidationState } from "office-ui-fabric-react";
import { IUser } from "moke-model";
import { UserStatusType } from "moke-enum";
import { SimpleSession } from "moke-util";

export interface IMokePeoplePickerProps {
    fetchUserData?: (fuzzyName: string) => Promise<IUser[]>;
    pickerRef?: React.RefObject<IBasePicker<IPersonaProps>>;
}

export class MokePeoplePicker extends React.Component<IMokePeoplePickerProps> {
    private userSelf: string;
    constructor(props: IMokePeoplePickerProps) {
        super(props);
        this.userSelf = SimpleSession.getSession("user").username;
    }

    public render() {
        const suggestionProps: IBasePickerSuggestionsProps = {
            suggestionsHeaderText: '用户匹配列表',
            noResultsFoundText: '空空如也',
            loadingText: '书山有路勤为径...',
        };
        return (
            <NormalPeoplePicker
                onResolveSuggestions={(filterText, selectedItems = []) => {
                    return this.props.fetchUserData!(filterText).then((users) => {
                        return users
                            .map((user) => {
                                return {
                                    text: user.username,
                                    secondaryText: UserStatusType[user.status!],
                                    optionalText: user.id
                                };
                            })
                            .filter((suggestionItem) => {
                                return !selectedItems.some((selectedItem) => {
                                    return selectedItem.text === suggestionItem.text;
                                }) && suggestionItem.text !== this.userSelf;
                            });
                    })
                }}
                getTextFromItem={this.getTextFromItem}
                pickerSuggestionsProps={suggestionProps}
                onValidateInput={this.validateInput}
                onInputChange={this.onInputChange}
                componentRef={this.props.pickerRef}
                resolveDelay={300}
            />
        );
    }

    private getTextFromItem = (item: IPersonaProps): string => {
        return item.text as string;
    }

    private validateInput = (input: string): ValidationState => {
        if (input.indexOf("@") !== -1) {
            return ValidationState.valid
        } else if (input.length > 1) {
            return ValidationState.warning;
        } else {
            return ValidationState.invalid;
        }
    }

    private onInputChange = (input: string): string => {
        const regEx = /<.*>/g;
        const emailAddress = regEx.exec(input);

        if (emailAddress && emailAddress[0]) {
            return emailAddress[0].substring(1, emailAddress[0].length - 1);
        }

        return input;
    }
}