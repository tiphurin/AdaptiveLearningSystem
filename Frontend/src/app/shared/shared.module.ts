import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DividerModule } from 'primeng/divider';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ErrorMessageComponent } from './error-message/error-message.component';
import {PasswordModule} from 'primeng/password';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {SpeedDialModule} from 'primeng/speeddial';
// import { NgbdCollapseBasic } from './collapse-basic';
import {SplitButtonModule} from 'primeng/splitbutton';
import { PhonePipe } from './pipe/phone.pipe';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RatingModule} from 'primeng/rating';
import {SkeletonModule} from 'primeng/skeleton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {TabViewModule} from 'primeng/tabview';
import {EditorModule} from 'primeng/editor';


@NgModule({
  declarations: [
    ErrorMessageComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    PanelModule,
    RatingModule,
    SkeletonModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    SplitButtonModule,
    AvatarModule,
    AvatarGroupModule,
    NgbModule,
    PanelMenuModule,
    MenubarModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    RippleModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ContextMenuModule,
    MultiSelectModule,
    TableModule,
    InputSwitchModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
    InputMaskModule,
    ProgressBarModule,
    DropdownModule,
    DialogModule,
    SliderModule,
    CalendarModule,
    ChipModule,
    ConfirmPopupModule,
    TagModule,
    ToastModule,
    DynamicDialogModule,
    DividerModule,
    StepsModule,
    MenuModule,
    TooltipModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    InputNumberModule,
    ToolbarModule,
    TabViewModule,
    EditorModule
  ],
  exports: [
    FormsModule,
    PanelModule,
    RatingModule,
    SkeletonModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    PhonePipe,
    SplitButtonModule,
    AvatarModule,
    AvatarGroupModule,
    NgbModule,
    PanelMenuModule,
    SidebarModule,
    MenubarModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    PasswordModule,
    RippleModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ContextMenuModule,
    MultiSelectModule,
    TableModule,
    InputSwitchModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
    InputMaskModule,
    ProgressBarModule,
    DropdownModule,
    DialogModule,
    SliderModule,
    CalendarModule,
    ChipModule,
    ConfirmPopupModule,
    TagModule,
    ToastModule,
    DynamicDialogModule,
    DividerModule,
    StepsModule,
    MenuModule,
    TooltipModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    InputNumberModule,
    ToolbarModule,
    TabViewModule,
    EditorModule
  ],
  providers: [MessageService]

})

export class SharedModule { }
