import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// PrimeVue Imports
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';

// PrimeVue Directives
import Tooltip from 'primevue/tooltip';
import BadgeDirective from 'primevue/badgedirective';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';

// PrimeVue Components
import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import CascadeSelect from 'primevue/cascadeselect';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DeferredContent from 'primevue/deferredcontent';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dock from 'primevue/dock';
import Dropdown from 'primevue/dropdown';
import DynamicDialog from 'primevue/dynamicdialog';
import Editor from 'primevue/editor';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import FloatLabel from 'primevue/floatlabel';
import Galleria from 'primevue/galleria';
import IconField from 'primevue/iconfield';
import Image from 'primevue/image';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputIcon from 'primevue/inputicon';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Row from 'primevue/row';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import SpeedDial from 'primevue/speeddial';
import SplitButton from 'primevue/splitbutton';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Steps from 'primevue/steps';
import TabMenu from 'primevue/tabmenu';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Terminal from 'primevue/terminal';
import Textarea from 'primevue/textarea';
import TieredMenu from 'primevue/tieredmenu';
import Timeline from 'primevue/timeline';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';
import ToggleButton from 'primevue/togglebutton';
import Tree from 'primevue/tree';
import TreeSelect from 'primevue/treeselect';
import TreeTable from 'primevue/treetable';
import VirtualScroller from 'primevue/virtualscroller';

// Custom Component
import BlockViewer from '@/components/BlockViewer.vue';

// Styles
import '@/assets/styles.scss';
import "primeflex/primeflex.css";


import { createPinia } from 'pinia'

// Create Vue App
const app = createApp(App);
const pinia = createPinia()

// Plugins
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(pinia);

// Reactive User State
const userState = reactive({
  user: null
});

// Firebase Authentication
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  userState.user = user;
});

// Provide Global User State
app.provide('userState', userState);

// Mount Application
app.mount('#app');

// Directives
app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

// Components Registration
const components = {
  BlockViewer,
  AutoComplete,
  Accordion,
  AccordionTab,
  Avatar,
  AvatarGroup,
  Badge,
  BlockUI,
  Button,
  ButtonGroup,
  Breadcrumb,
  Calendar,
  Card,
  Chart,
  CascadeSelect,
  Carousel,
  Checkbox,
  Chip,
  Chips,
  ColorPicker,
  Column,
  ColumnGroup,
  ConfirmDialog,
  ConfirmPopup,
  ContextMenu,
  DataTable,
  DataView,
  DeferredContent,
  Dialog,
  Divider,
  Dock,
  Dropdown,
  DynamicDialog,
  Editor,
  Fieldset,
  FileUpload,
  FloatLabel,
  Galleria,
  IconField,
  Image,
  InlineMessage,
  Inplace,
  InputGroup,
  InputGroupAddon,
  InputIcon,
  InputSwitch,
  InputText,
  InputMask,
  InputNumber,
  Knob,
  Listbox,
  MegaMenu,
  Menu,
  Menubar,
  Message,
  MultiSelect,
  OrderList,
  OrganizationChart,
  OverlayPanel,
  Paginator,
  Panel,
  PanelMenu,
  Password,
  PickList,
  ProgressBar,
  ProgressSpinner,
  RadioButton,
  Rating,
  Row,
  SelectButton,
  ScrollPanel,
  ScrollTop,
  Skeleton,
  Slider,
  Sidebar,
  SpeedDial,
  SplitButton,
  Splitter,
  SplitterPanel,
  Steps,
  TabMenu,
  TabView,
  TabPanel,
  Tag,
  Terminal,
  Textarea,
  TieredMenu,
  Timeline,
  Toast,
  Toolbar,
  ToggleButton,
  Tree,
  TreeSelect,
  TreeTable,
  VirtualScroller
};

// Register all components
Object.entries(components).forEach(([name, component]) => {
  app.component(name, component);
});
