import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({ currency, setCurrency, currentLanguageCode, dispatch, borderStyle }) => {
  return (
    <div className={`header-top-wap ${borderStyle === "fluid-border" ? "border-bottom" : ""}`}>
      <LanguageCurrencyChanger
        currency={currency}
        setCurrency={setCurrency}
        currentLanguageCode={currentLanguageCode}
        dispatch={dispatch}
      />
      <div className="header-offer">
        <p>
          Miễn phí giao hàng cho đơn hàng trên{" "}
          <span>
            {currency.currencyName === "VND"
              ? (10 * currency.currencyRate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                " " +
                currency.currencySymbol
              : currency.currencySymbol + (10 * currency.currencyRate).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        </p>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currencyName) => {
      dispatch(setCurrency(currencyName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(HeaderTop));
